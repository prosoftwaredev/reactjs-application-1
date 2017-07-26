import React from 'react';

class Rss extends React.Component {
  componentDidMount() {
    this.props.actions.fetchNews();
  }
  render() {
    const { rss: { news = [], loading } } = this.props;
    return (
      <div className="dashboard-todo panel panel-default">
        <div className="panel-heading">
          News
        </div>
        <table className="table table-bordered table-hover">
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {news.map(rss => (
              <tr key={rss.title + Math.random()}>
                <td>
                  <a href={rss.link} target="_blank" rel="noopener noreferrer" className="rssLink">
                    <h5>{rss.title}</h5>
                    {/* <p>{ReactHtmlParser(rss.description)}</p>
                    */}
                    <p dangerouslySetInnerHTML={{ __html: rss.description || '' }} />
                  </a>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

Rss.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

export default Rss;
