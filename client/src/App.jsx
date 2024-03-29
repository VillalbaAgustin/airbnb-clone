import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexPage, LoginPage, RegisterPage, ProfilePage, PlacesPage, PlacePage, BookingsPage, BookingPage} from "./pages";
import { Layout } from "./layout/Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { PlacesFormPage } from "./components/PlacesFormPage";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>}/>
          <Route path="/account/bookings/:id" element={<BookingPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
};
