/* ******************************** Import Packages ******************************* */
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import {
  LazyMotion,
  domAnimation,
  // m,
  //  spring
} from "framer-motion";
// import NotFound from "../../pages/not-found";
// import Forbidden from "../../pages/forbidden";

/***********************Import styled component level*********************************/
import { Container, ContentStyled } from "./style";
import { useSelector } from "react-redux";

/******************Import rotes to route the content based on routes*********************/
import routes from "../../constants/routes";
// import { toSnakeCase } from "../../utils";

const Content = (props) => {
  const {
    onClick,
  } = props;

  const sidebardata = useSelector(
    (store) => store.SideBar.storeSideBarMinimizer
  );

  const navBar = useSelector((store) => store.NavbarReduce.NavBarMinimizer);


  return (
    <LazyMotion features={domAnimation}>
      <ContentStyled
        sidebardata={sidebardata}
        sidebardata1={navBar}
        onClick={()=>onClick()}
      >
        <Container>
          <div
            key={window.location.pathname}
          >
            <Suspense
              fallback={
                <div className="d-flex justify-content-center align-items-center">
                </div>
              }
            >
               <Switch>
              {routes?.map((route, index) =>
                route?.subMenu ? (
                  route?.subMenu?.map((child, idx) => (
                    <Route
                      key={idx}
                      path={child.route}
                      exact={child.exact}
                      name={child.name}
                      render={(props) => <child.element {...props} />}
                    />
                  ))
                ) : (
                  <Route
                    key={index}
                    path={route.route}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.element {...props} />}
                  />
                )
              )}
            </Switch>
            </Suspense>
          </div>
        </Container>
      </ContentStyled>
    </LazyMotion>
  );
};
export default Content;
