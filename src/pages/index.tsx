import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            شروع کنید - 5 دقیقه ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="مستندات کامل سیستم پشتیبانی و راهنمای کاربری">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className="feature-card">
                  <div className="feature-card__icon">📚</div>
                  <h3 className="feature-card__title">مستندات کامل</h3>
                  <p className="feature-card__description">
                    راهنمای جامع و کامل برای استفاده از تمام ویژگی‌های سیستم
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="feature-card">
                  <div className="feature-card__icon">🔧</div>
                  <h3 className="feature-card__title">API قدرتمند</h3>
                  <p className="feature-card__description">
                    API کامل و مستند برای یکپارچه‌سازی با سیستم‌های دیگر
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="feature-card">
                  <div className="feature-card__icon">🛠️</div>
                  <h3 className="feature-card__title">عیب‌یابی آسان</h3>
                  <p className="feature-card__description">
                    راه‌حل‌های سریع و موثر برای حل مشکلات رایج
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.cta}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="text--center">
                  <Heading as="h2">آماده شروع هستید؟</Heading>
                  <p>
                    با راهنمای کامل ما شروع کنید و در کمتر از 5 دقیقه سیستم را راه‌اندازی کنید.
                  </p>
                  <div className={styles.buttons}>
                    <Link
                      className="button button--primary button--lg"
                      to="/docs/getting-started/installation">
                      راهنمای نصب
                    </Link>
                    <Link
                      className="button button--secondary button--lg"
                      to="/docs/api/intro">
                      مستندات API
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}