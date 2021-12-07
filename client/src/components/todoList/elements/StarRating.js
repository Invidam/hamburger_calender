import StarRatings from "react-star-ratings";

export const StarRating = ({ priority, onChangePriority }) => {
  const isEditMode = onChangePriority;
  const getColorSetting = () => {
    if (isEditMode) {
      const starRatedColor = "rgb(255, 223, 0)";
      const starHoverColor = "rgb(255, 223, 0)";
      const starEmptyColor = "rgba(162, 162, 162, 1)";
      return { starRatedColor, starHoverColor, starEmptyColor };
    } else {
      const starRatedColor = "rgb(224, 200, 47)";
      const starHoverColor = "rgb(224, 200, 47)";
      const starEmptyColor = "rgba(133, 133, 133, 1)";
      return { starRatedColor, starHoverColor, starEmptyColor };
    }
  };
  const isPortrait = () => window.matchMedia("(orientation: portrait)").matches;
  const { starRatedColor, starHoverColor, starEmptyColor } = getColorSetting();
  return (
    <div className={`todo__star-rating todo-display__star}`}>
      <StarRatings
        rating={priority}
        changeRating={onChangePriority}
        starRatedColor={starRatedColor}
        starHoverColor={starHoverColor}
        starEmptyColor={starEmptyColor}
        starSelectingHoverColor="red"
        numberOfStars={5}
        name="rating"
        starDimension={isPortrait() ? "2.25vh" : `1.25vw`}
        starSpacing="2px"
      />{" "}
    </div>
  );
};
