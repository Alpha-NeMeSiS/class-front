// src/App.tsx
import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Search from './pages/Search';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import Category from './pages/Category';
import Ingredient from './pages/Ingredient';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Profile from './pages/Profile/Profile';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import Favorites from './pages/Favorites/Favorites';
import SubmitRecipe from './pages/SubmitRecipe/SubmitRecipe';
import { useAuth } from './contexts/useAuth';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="main-nav">
        <div className="logo">KookBook</div>
        <ul className="nav-list">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/my-recipes">Mes Recettes</Link></li>
          <li><Link to="/submit">Ajoute une Recette</Link></li>
          <li><Link to="/favorites">Favoris</Link></li>

          {user ? (
            <>
              <li className="nav-user">Bonjour, {user.name}</li>
              <li>
                <button onClick={logout} className="nav-logout-button">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Connexion</Link></li>
          )}
        </ul>
      </nav>

      <Routes>
        {/* routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/categories/:slug" element={<Category />} />
        <Route path="/ingredients/:slug" element={<Ingredient />} />

        {/* on déclare toujours ces routes, même si l'utilisateur est connecté */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/" replace /> : <ForgotPassword />}
        />

        {/* 🔐 routes protégées */}
        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />
        <Route
          path="/my-recipes"
          element={<PrivateRoute><MyRecipes /></PrivateRoute>}
        />
        <Route
          path="/favorites"
          element={<PrivateRoute><Favorites /></PrivateRoute>}
        />
        <Route
          path="/submit"
          element={<PrivateRoute><SubmitRecipe /></PrivateRoute>}
        />

        {/* éventuellement une 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
