import React from "react";
import { UsersProvider } from "./components/contexts/UsersContext.js";
import { UserProvider } from "./components/contexts/UserContext.js";
import { CreateAccountProvider } from "./components/contexts/CreateAccountContext.js";
import { EditUserProvider } from "./components/contexts/EditUserContext.js";
import { ShowAlertProvider } from "./components/contexts/ShowAlertContext.js";
import { ShowFullInfoProvider } from "./components/contexts/ShowFullInfoContext.js";
import { ShowModalProvider } from "./components/contexts/ShowModalContext.js";
import { SearchProvider } from "./components/contexts/SearchContext.js";
import { RefSearchProvider } from "./components/contexts/RefSearchContext.js";

import Header from "./components/modules/Header.js";
import UserList from "./components/modules/UserList.js";
import AddUser from "./components/modules/AddUser.js";
import ProfileCard from "./components/modules/ProfileCard.js";

const App = () => {

  return (
    <UsersProvider>
      <UserProvider>
        <CreateAccountProvider>
          <EditUserProvider>
            <ShowAlertProvider>
              <ShowModalProvider>
                <ShowFullInfoProvider>
                  <SearchProvider>
                    <RefSearchProvider>
                  <Header />
                  <body>
                    <div className="container">
                      <aside className="sidebar">
                        <ProfileCard />
                      </aside>
                        <div className="wrapper-group">
                          <AddUser />
                          <UserList />
                        </div>

                    </div>
                  </body>
                  </RefSearchProvider>
                  </SearchProvider>
                </ShowFullInfoProvider>
              </ShowModalProvider>
            </ShowAlertProvider>
          </EditUserProvider>
        </CreateAccountProvider>
      </UserProvider>
    </UsersProvider>
  );
};

export default App;
