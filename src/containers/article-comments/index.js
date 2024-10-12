import { memo, useMemo } from 'react';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import Comments from '../../containers/comments';
import listToTree from '../../utils/list-to-tree';
import Spinner from '../../components/spinner';


function ArticleComments({ article }) {
  const dispatch = useDispatch();
  useInit(() => { dispatch(commentsActions.load(article)) }, [article]);

  const select = useSelector(
    state => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
    }),
    shallowequal,
  );

  const options = {
    comments: useMemo(
      () => listToTree(select.comments.items ?? []), [select.comments.items],
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <Comments
        article={article}
        comments={options.comments}
        count={select.comments.count}/>
    </Spinner>
  );
}

export default memo(ArticleComments);
