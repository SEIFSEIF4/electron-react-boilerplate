const { getAllHistory } = require('node-browser-history');

export default function BrowserHistoryComponent() {
  getAllHistory(10)
    .then((history: any) => {
      console.log(history);
      return history;
    })
    .catch((error: any) => {
      console.error(error);
      return null;
    });

  return (
    <div>
      <button type="button" onClick={getAllHistory}>
        Get Browsing History
      </button>
    </div>
  );
}
