import { memo } from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import CommentForm from '../../components/comment-form';
import ContainerLayout from '../../components/container-layout';
import useTranslate from '../../hooks/use-translate';
import CommentInfo from '../../components/comment-info';

function CommentFormSection({ comment, currentForm, onCreate = () => {}, onClose = () => {}, ...props }) {
    const { t } = useTranslate();
    const select = useSelector(state => ({
        exists: state.session.exists,
    }));

    const callbacks = {
        onCreate: (text) => onCreate(text),
        onClose: () => onClose(),
    };

    return (
        <ContainerLayout {...props}>
            {
                (select.exists)
                    ? (comment)
                        ? <CommentForm
                            t={t}
                            title={t('comments.answer')}
                            create={callbacks.onCreate}
                            close={{ title: t('comments.cancel'), onClose: callbacks.onClose }}/>
                        : <CommentForm
                            t={t}
                            create={callbacks.onCreate}
                            title={t('comments.comment')}/>
                    : (comment)
                        ? <CommentInfo
                            link={{ to: '/login', title: t('comments.login') }}
                            title={t('comments.login.message')}
                            close={{ title: t('comments.cancel'), onClose: callbacks.onClose}}/>
                        : <CommentInfo
                            link={{ to: '/login', title: t('comments.login') }}
                            title={t('comments.login.message.other')}/>
            }  
        </ContainerLayout>
    )
}

CommentFormSection.propTypes = {
    comment: PropTypes.object,
    currentForm: PropTypes.string.isRequired,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
};

export default memo(CommentFormSection);
