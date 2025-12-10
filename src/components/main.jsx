import { useState } from "react";

export default function SmoothieForm() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [smoothieName, setSmoothieName] = useState("");
  const [savedSmoothies, setSavedSmoothies] = useState([]);

  // handle checkbox selection
  function handleIngredientChange(event) {
    const { value, checked } = event.target;
    setSelectedIngredients((prev) =>
      checked ? [...prev, value] : prev.filter((i) => i !== value)
    );
  }

  // handle name input
  function handleNameChange(event) {
    setSmoothieName(event.target.value);
  }

  // save smoothie
  function handleSaveSmoothie(event) {
    event.preventDefault();

    if (!smoothieName || selectedIngredients.length === 0) {
      alert("Please enter a smoothie name and select ingredients!🥛🥛.....");
      return;
    }

    const newSmoothie = {
      id: Date.now(),
      name: smoothieName,
      ingredients: selectedIngredients,
    };

    setSavedSmoothies((prev) => [...prev, newSmoothie]);
    setSmoothieName("");
    setSelectedIngredients([]); // clear selected checkboxes
  }

  // delete smoothie
  function handleDeleteSmoothie(id) {
    setSavedSmoothies((prev) => prev.filter((s) => s.id !== id));
  }

  const ingredientList = [
    "Banana 🍌",
    "Strawberry🍓",
    "Blueberry🫐",
    "Mango🥭",
    "Pineapple🍍",
    "Vanilla flavouring🍦",
    "Peanut butter🥜",
    "Yogurt🍧",
    "Honey🍯",
    "Chia seeds🌱",
  ];

  return (
    <>
      <form onSubmit={handleSaveSmoothie}>
        <fieldset className="ingredients-options">
          <legend>Create Your Smoothie</legend>

          <label>
            Smoothie Name:
            <input
              type="text"
              value={smoothieName}
              onChange={handleNameChange}
              placeholder="Enter smoothie name"
            />
          </label>

          <div>
            {ingredientList.map((ingredient) => (
              <label key={ingredient}>
                <input
                  type="checkbox"
                  name="smoothie-ingredients"
                  value={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={handleIngredientChange}
                />
                {ingredient}
              </label>
            ))}
          </div>

          <button type="submit">Save Smoothie</button>
        </fieldset>
      </form>

      {/* Preview Section */}
      <section className="preview">
        <h2>Preview</h2>
        {selectedIngredients.length > 0 ? (
          <>
            <h3>{smoothieName || "Unnamed Smoothie"}</h3>
            <ul>
              {selectedIngredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Choose some ingredients to get started!😉...</p>
        )}
      </section>

      {/* Saved Smoothies */}
      <section className="saved-smoothies">
        <h2>Saved Smoothies</h2>
        {savedSmoothies.length > 0 ? (
          savedSmoothies.map((smoothie) => (
            <div key={smoothie.id}>
              <h3>{smoothie.name}</h3>
              <ul>
                {smoothie.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
              <button onClick={() => handleDeleteSmoothie(smoothie.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No smoothies saved yet.</p>
        )}
      </section>
    </>
  );
}
