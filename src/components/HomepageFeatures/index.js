import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use', // 标题
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default, // 图片
    description: (
      <>
        Docusaurus 从一开始就设计为易于安装和运行。
      </>
    ),
  },
  {
    title: '专注于重要的事情', // 标题
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default, // 图片
    description: (
      <>
        Docusaurus 让你专注于文档，我们会处理杂务。请将你的文档移到 <code>docs</code> 目录中。
      </>
    ),
  },
  {
    title: '由 React 提供支持', // 标题
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default, // 图片
    description: (
      <>
        通过重用 React 来扩展或自定义你的网站布局。Docusaurus 可以扩展，同时使用相同的头部和底部。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
