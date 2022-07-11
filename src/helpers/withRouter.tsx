import { useNavigate, NavigateFunction } from "react-router-dom";

export interface RouterComponentProps {
  navigate: NavigateFunction;
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
