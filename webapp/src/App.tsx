import { createStyles, WithStyles, withStyles } from "@material-ui/core"
import * as React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { AppListener } from "./AppListener"
import { AboutPage } from "./Components/Pages/AboutPage"
import { ExplanationsPage } from "./Components/Pages/ExplanationsPage"
import { GlobalStatsPage } from "./Components/Pages/GlobalStatsPage"
import { HomePage } from "./Components/Pages/HomePage"
import { LeaderboardsPage } from "./Components/Pages/LeaderboardsPage"
import { PlayerComparePage } from "./Components/Pages/PlayerComparePage"
import { PlayerPage } from "./Components/Pages/PlayerPage"
import { PluginsPage } from "./Components/Pages/PluginsPage"
import { PrivacyPolicyPage } from "./Components/Pages/PrivacyPolicyPage"
import { ReplayPage } from "./Components/Pages/ReplayPage"
import { ReplaysGroupPage } from "./Components/Pages/ReplaysGroupPage"
import { ReplaysSearchPage } from "./Components/Pages/ReplaysSearchPage"
import { StatusPage } from "./Components/Pages/StatusPage"
import { UploadPage } from "./Components/Pages/UploadPage"
import { Notifications } from "./Components/Shared/Notification/Notifications"
import {
    ABOUT_LINK,
    EXPLANATIONS_LINK,
    GLOBAL_STATS_LINK,
    LEADERBOARDS_LINK,
    PLAYER_COMPARE_PAGE_LINK,
    PLAYER_PAGE_LINK,
    PLAYER_TAG_PAGE,
    PLUGINS_LINK,
    PRIVACY_POLICY_LINK,
    REPLAY_PAGE_LINK,
    REPLAYS_GROUP_PAGE_LINK,
    REPLAYS_SEARCH_PAGE_LINK,
    STATUS_PAGE_LINK,
    UPLOAD_LINK
} from "./Globals"
import { TaggedMatchesPage } from "./Components/Pages/TaggedMatches"

const styles = createStyles({
    App: {
        margin: 0,
        minHeight: "100vh",
        width: "100%",
        display: "flex"
    }
})

type Props = WithStyles<typeof styles>

class AppComponent extends React.Component<Props> {
    public render() {
        return (
            <div className={this.props.classes.App}>
                <BrowserRouter>
                    <AppListener>
                        <Switch>
                            {/*Migrate old paths*/}
                            <Redirect exact from={"/players/overview/:id"} to={PLAYER_PAGE_LINK(":id")}/>
                            <Redirect exact from={"/replays/parsed/view/:id"} to={REPLAY_PAGE_LINK(":id")}/>

                            <Route exact path="/" component={HomePage}/>
                            <Route path={LEADERBOARDS_LINK} component={LeaderboardsPage}/>
                            <Route path={PLAYER_TAG_PAGE(":id", ":tagname")} component={TaggedMatchesPage}/>
                            <Route path={PLAYER_PAGE_LINK(":id")} component={PlayerPage}/>
                            <Route path={PLAYER_COMPARE_PAGE_LINK} component={PlayerComparePage}/>
                            <Route path={REPLAY_PAGE_LINK(":id")} component={ReplayPage}/>
                            <Route path={REPLAYS_GROUP_PAGE_LINK} component={ReplaysGroupPage}/>
                            <Route path={REPLAYS_SEARCH_PAGE_LINK()} component={ReplaysSearchPage}/>
                            <Route exact path={ABOUT_LINK} component={AboutPage}/>
                            <Route exact path={UPLOAD_LINK} component={UploadPage}/>
                            <Route exact path={GLOBAL_STATS_LINK} component={GlobalStatsPage}/>
                            <Route exact path={PLUGINS_LINK} component={PluginsPage}/>
                            <Route exact path={STATUS_PAGE_LINK} component={StatusPage}/>
                            <Route exact path={EXPLANATIONS_LINK} component={ExplanationsPage}/>
                            <Route exact path={PRIVACY_POLICY_LINK} component={PrivacyPolicyPage}/>
                            {/*Redirect unknowns to root*/}
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </AppListener>
                </BrowserRouter>
                <Notifications/>
            </div>
        )
    }
}

export const App = withStyles(styles)(AppComponent)
