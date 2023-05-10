const NoItem = () => {
  return (
    <div className="currently-playing currently-playing--null">
      <div className="currently-playing--bg"></div>

      <div className="currently-playing--content">
        <h1>Waiting...</h1>
      </div>
    </div>
  );
};

export default NoItem;
