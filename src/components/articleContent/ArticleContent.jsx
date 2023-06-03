import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './articleContent.scss';
import getDocById from '../../utils/getDocById';
import AuthContext from '../../context/AuthContext';

import Toc from '../toc/Toc';
import Cat from '../cat/Cat';
import Dropdown from '../dropdown/Dropdown';
import Contributor from '../Contributor/Contributor';

const ArticleContent = ({ article }) => {
  const { currentUser } = useContext(AuthContext);

  const [cats, setCats] = useState([]);
  const [contributors, setContributors] = useState([]);

  function addLineBreaks(text) {
    return text.replace(/ {2}/g, '\n');
  }

  useEffect(() => {
    if (article.cats && article.contributors) {
      const fetchCats = async () => {
        const articleCats = await Promise.all(
          article.cats.map((catId) => {
            return getDocById('Categories', catId);
          })
        );

        setCats(articleCats);
      };

      const fetchContributors = async () => {
        const articleContributors = await Promise.all(
          article.contributors.map((contributorsId) => {
            return getDocById('Users', contributorsId);
          })
        );

        setContributors(articleContributors);
      };

      fetchCats();
      fetchContributors();
    }
  }, [article]);

  return (
    <div className="article-content">
      <div className="container">
        <div className="article-content__top">
          <h1 className="article-content__title">{article.title}</h1>
          {currentUser?.isAdmin && (
            <Link
              to={`/edit-article/${article.title}`}
              className="article-content__edit"
            >
              <svg
                fill="#000000"
                height="800px"
                width="800px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 502.001 502.001"
              >
                <g>
                  <g>
                    <g>
                      <path
                        d="M489.809,32.002l-19.797-19.798C462.142,4.333,451.679,0,440.551,0s-21.59,4.333-29.459,12.202l-14.99,14.99
                    l-1.959-1.959c-3.905-3.904-10.235-3.905-14.143,0L62.146,343.088l0.011,0.004c-0.911,0.91-1.658,1.992-2.169,3.215
                    l-29.102,69.719L0.782,488.148c-1.562,3.742-0.71,8.056,2.157,10.923c1.913,1.914,4.472,2.93,7.073,2.93
                    c1.297,0,2.605-0.252,3.851-0.772l72.123-30.105c0.002-0.001,0.004-0.002,0.005-0.003l69.712-29.099
                    c1.223-0.51,2.305-1.257,3.215-2.168l0.004,0.011L476.778,122.01c1.875-1.875,2.929-4.419,2.929-7.071
                    c0-2.652-1.054-5.196-2.929-7.071l-1.959-1.959l14.99-14.989C506.052,74.676,506.052,48.246,489.809,32.002z M28.611,473.399
                    L43.596,437.5l20.915,20.914L28.611,473.399z M84.466,450.085l-32.541-32.54l20.772-49.763l61.532,61.531L84.466,450.085z
                     M151.852,418.65L83.36,350.159l271.839-271.84l68.492,68.492L151.852,418.65z M437.834,132.669l-68.492-68.492l17.73-17.73
                    l68.492,68.492L437.834,132.669z M475.666,76.776L460.822,91.62l-50.431-50.432l14.844-14.844
                    c4.091-4.091,9.53-6.344,15.316-6.344s11.227,2.253,15.317,6.344l19.797,19.797C484.111,54.588,484.111,68.33,475.666,76.776z"
                      />
                      <path
                        d="M255.258,199.397L110.627,344.029c-3.905,3.905-3.905,10.237,0,14.143c1.953,1.953,4.512,2.929,7.071,2.929
                    s5.118-0.977,7.071-2.929l144.632-144.633c3.905-3.905,3.905-10.237,0-14.142C265.495,195.492,259.165,195.492,255.258,199.397z"
                      />
                      <path
                        d="M300.255,154.4l-18.213,18.213c-3.905,3.905-3.905,10.237,0,14.143c1.953,1.952,4.512,2.929,7.071,2.929
                    s5.118-0.977,7.071-2.929l18.213-18.213c3.906-3.905,3.906-10.237,0.001-14.143C310.492,150.496,304.162,150.496,300.255,154.4z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
          )}
        </div>
        <div className="article-content__info">
          {article.mainImage && (
            <img
              src={article.mainImage}
              alt="Something went wrong"
              className="article-content__img"
            />
          )}
          <div className="article-content__toc-box">
            {article.content && (
              <Toc content={addLineBreaks(article.content)} />
            )}
          </div>
        </div>
        <ReactMarkdown skipHtml={true}>
          {article.content && addLineBreaks(article.content)}
        </ReactMarkdown>
        {cats.length > 0 && (
          <Dropdown title="Categories">
            {cats.map((cat) => (
              <Cat title={cat.title} key={cat.id} />
            ))}
          </Dropdown>
        )}
        {contributors.length > 0 && (
          <Dropdown title="Contributors">
            {contributors.map((contributor) => (
              <Contributor
                img={contributor.img}
                username={contributor.username}
                key={contributor.id}
              />
            ))}
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default ArticleContent;
