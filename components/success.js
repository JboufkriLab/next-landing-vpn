export default function Success() {
    const { t } = useTranslation();
  
    return (
      <div>
        <Head>
          <title>{t('success')}</title>
        </Head>
        <p>{t('registration_successful')}</p>
      </div>
    );
  }
  