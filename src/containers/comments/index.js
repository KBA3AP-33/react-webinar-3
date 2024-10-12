import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import Comment from '../../containers/comment';
import CommentsHead from '../../components/comments-head';
import ContainerLayout from '../../components/container-layout';
import CommentFormSection from '../comment-form-section';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

function Comments({ article, comments, count }) {
  const [currentForm, setCurrentForm] = useState('');
  const dispatch = useDispatch();
  const select = useSelector(state => ({
    user: state.session.user,
  }));
  const { t } = useTranslate();

  const callbacks = {
    onClose: (value = '') => setCurrentForm(value),
    onCreate: (text) => {
      const parent = (currentForm) ? { _id: currentForm, _type: 'comment' } : { _id: article, _type: 'article' };
      dispatch(commentsActions.create(
        select.user,
        { text, parent },
        (value = '') => setCurrentForm(value)));
    },
  };
  
  return (
    <ContainerLayout direction="column" items="start" padding="big">
      <CommentsHead title={`${t('comments')} (${count})`}/>
      <>
        {
          (comments?.length)
            ? comments.map(e => e.children.map(comment => 
              <div key={comment._id}>
                <Comment 
                  comment={comment}
                  username={select.user?.profile?.name}
                  level={0}
                  onCreate={callbacks.onCreate}
                  onClose={callbacks.onClose}
                  currentForm={currentForm}/>
                  {
                    (currentForm === comment._id) &&
                      <ContainerLayout style={{ marginLeft: `30px` }}>
                        <CommentFormSection
                          comment={comment}
                          onCreate={callbacks.onCreate}
                          onClose={callbacks.onClose}
                          currentForm={currentForm}/>
                      </ContainerLayout>
                  }
              </div>))
            : <></>
        }
        {
          (!currentForm) &&
            <CommentFormSection
              onCreate={callbacks.onCreate}
              onClose={callbacks.onClose}
              currentForm={article}/>
        }
      </>
    </ContainerLayout>
  )
}

export default memo(Comments);
