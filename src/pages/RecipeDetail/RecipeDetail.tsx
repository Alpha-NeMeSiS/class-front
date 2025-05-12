import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './RecipeDetail.module.scss';

// Même source de données factices (ou remplacez par un fetch)
const allRecipes = [
  { id: 1, name: 'Tarte aux pommes', image: '/assets/popular1.jpg', rating: 5,
    ingredients: ['3 pommes', '200 g de farine', '100 g de sucre', '50 g de beurre'],
    instructions: [
      'Préchauffer le four à 180 °C.',
      'Étaler la pâte dans un moule.',
      'Disposer les pommes en lamelles.',
      'Saupoudrer de sucre et enfourner 30 min.',
    ],
  },
  // … les autres recettes …
];

const RecipeDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = allRecipes.find(r => r.id === Number(id));

  if (!recipe) {
    return <div className={styles.notFound}>Recette non trouvée.</div>;
  }

  return (
    <div className={styles.detail}>
      <Link to="/" className={styles.backLink}>← Retour à l’accueil</Link>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className={styles.image} />
      <div className={styles.rating}>
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < recipe.rating ? styles.filled : ''}>★</span>
        ))}
      </div>
      <section className={styles.section}>
        <h2>Ingrédients</h2>
        <ul>
          {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Préparation</h2>
        <ol>
          {recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
        </ol>
      </section>
    </div>
  );
};

export default RecipeDetail;
