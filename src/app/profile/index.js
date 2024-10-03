import { memo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import ArticleProfile from '../../components/article-profile';
import AuthBar from '../../containers/auth-bar';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.authorization.user,
  }));

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login?from=/profile');
    }
  }, [select.user])

  return (
    <PageLayout>
      <AuthBar/>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ArticleProfile article={select.user} t={t}/>
    </PageLayout>
  );
}

export default memo(Profile);
