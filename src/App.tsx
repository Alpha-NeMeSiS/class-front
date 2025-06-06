import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Search from './pages/Search.tsx'
import RecipeDetail from './pages/RecipeDetail.tsx'
import Category from './pages/Category.tsx'
import Ingredient from './pages/Ingredient.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import Profile from './pages/Profile.tsx'
import MyRecipes from './pages/MyRecipes.tsx'
import Favorites from './pages/Favorites.tsx'
import SubmitRecipe from './pages/SubmitRecipe.tsx'



function App() {
  return (
    <>
      <nav className="main-nav">
      <div className="logo">
        KookBook
      </div>
      <ul className="nav-list">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/my-submit">Mes Recettes</Link></li>
        <li><Link to="/submit">Ajoute une Recettes</Link></li>
        <li><Link to="/favorites">Favoris</Link></li>
      </ul>
    </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/categories/:slug" element={<Category />} />
        <Route path="/ingredients/:slug" element={<Ingredient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/submit" element={<SubmitRecipe />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>



    </>
  )
}

export default App

