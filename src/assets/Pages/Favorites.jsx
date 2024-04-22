const Favorites = ({ favorites }) => {
  console.log("Favorites:", favorites);

  return (
    <div className="favorites">
      <h1>My Favorites</h1>
      {favorites && favorites.length > 0 ? (
        favorites.map((character) => (
          <div key={character._id}>
            <h2>{character.name}</h2>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="character-image"
            />
            <p
              className={`character-description ${
                !character.description ? "no-description" : ""
              }`}
            >
              {character.description ? character.description : "No description"}
            </p>
          </div>
        ))
      ) : (
        <p>No favorites added yet</p>
      )}
    </div>
  );
};

export default Favorites;
