import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import PresenterView from "./presenter.tsx";
import "./styles/index.css";

const isPresenterView = window.location.pathname === '/presenter' || window.location.hash === '#/presenter';

createRoot(document.getElementById("root")!).render(
  isPresenterView ? <PresenterView /> : <App />
);