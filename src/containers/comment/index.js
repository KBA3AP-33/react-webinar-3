import { memo } from 'react';
import PropTypes from 'prop-types';
import CommentComponent from "../../components/comment";
import ContainerLayout from '../../components/container-layout';
import useTranslate from '../../hooks/use-translate';
import CommentFormSection from '../comment-form-section';
import dateFormat from '../../utils/date-format';

function Comment({ comment, currentForm, onCreate = () => {}, onClose = () => {}, level, ...props }) {
    const { t, lang } = useTranslate();
    const date = dateFormat(comment.dateCreate, lang);

    const callbacks = {
        onCreate: (text) => onCreate(text),
        onClose: () => onClose(),
    };

    return (
        <ContainerLayout {...props}>
            <>
                {
                    (comment) &&
                        <CommentComponent
                            comment={{ ...comment, dateCreate: `${date.day} ${t('in')} ${date.time}` }}
                            onReply={onClose}
                            t={t}/>
                }
                {
                    (comment?.children?.length)
                        ? comment.children.map((e) =>
                            <div key={e._id}>
                                <Comment
                                    comment={e}
                                    level={level}
                                    currentForm={currentForm}
                                    onCreate={callbacks.onCreate}
                                    onClose={onClose}
                                    style={{ marginLeft: `${(level + 1) * 30}px` }}/>
                                    {
                                        (currentForm === e._id) &&
                                            <CommentFormSection
                                                comment={e}
                                                onCreate={callbacks.onCreate}
                                                onClose={onClose}
                                                currentForm={currentForm}
                                                style={{ marginLeft: `${(level + 1) * 60}px` }}/>
                                    }
                                    
                            </div>


                        )
                        : <></>
                }
            </>
        </ContainerLayout>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
    level: PropTypes.number.isRequired,
};

export default memo(Comment);
