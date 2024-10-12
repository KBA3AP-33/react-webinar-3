import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import CommentForm from '../../components/comment-form';
import ContainerLayout from '../../components/container-layout';
import useTranslate from '../../hooks/use-translate';
import CommentInfo from '../../components/comment-info';
import { useLocation } from 'react-router-dom';
import useScrollView from '../../hooks/use-scroll-view';

function CommentFormSection({ comment, currentForm, onCreate = () => {}, onClose = () => {}, ...props }) {
    const { t } = useTranslate();
    const select = useSelector(state => ({
        exists: state.session.exists,
    }));
    const location = useLocation();

    const { ref, view } = useScrollView();
    useEffect(() => { view(); }, []);
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
                            ref={ref}
                            title={t('comments.answer')}
                            create={callbacks.onCreate}
                            close={{ title: t('comments.cancel'), onClose: callbacks.onClose }}/>
                        : <CommentForm
                            t={t}
                            create={callbacks.onCreate}
                            title={t('comments.comment')}/>
                    : (comment)
                        ? <CommentInfo
                            ref={ref}
                            link={{ to: '/login', title: t('comments.login') }}
                            state={{ back: location.pathname }}
                            title={t('comments.login.message')}
                            close={{ title: t('comments.cancel'), onClose: callbacks.onClose}}/>
                        : <CommentInfo
                            link={{ to: '/login', title: t('comments.login') }}
                            state={{ back: location.pathname }}
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
