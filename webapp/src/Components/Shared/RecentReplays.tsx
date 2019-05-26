import {
    createStyles,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
    Typography,
    WithStyles,
    withStyles
} from "@material-ui/core"
import { Replay } from "../../Models"
import { REPLAY_PAGE_LINK } from "../../Globals"
import InsertChart from "@material-ui/icons/InsertChart"
import * as React from "react"

interface MyProps {
    recent?: Replay[] | undefined
}

type Props = MyProps & WithStyles<typeof styles>

export class RecentReplaysComponent extends React.PureComponent<Props> {
    public render() {
        const {recent, classes} = this.props
        return (
            <Paper>
                <div style={{padding: "15px"}}>
                    <Typography variant={"h4"}>Recent Replays</Typography>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Match Time
                            </TableCell>
                            <TableCell>
                                Gamemode
                            </TableCell>
                            <TableCell>
                                Map
                            </TableCell>
                            <TableCell>
                                Score
                            </TableCell>
                            <TableCell>
                                Link
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recent && recent.map((replay: Replay) => (
                            <TableRow>
                                <TableCell>
                                    {replay.date.format("LLLL")}
                                </TableCell>
                                <TableCell>
                                    {replay.gameMode}
                                </TableCell>
                                <TableCell>
                                    {replay.map}
                                </TableCell>
                                <TableCell>
                                    {replay.gameScore.team0Score} - {replay.gameScore.team1Score}
                                </TableCell>
                                <TableCell>
                                    <IconButton href={REPLAY_PAGE_LINK(replay.id)}
                                                className={classes.iconButton}>
                                        <InsertChart/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

const styles = (theme: Theme) => createStyles({
    iconButton: {
        "height": 20,
        "width": 20,
        "color": theme.palette.secondary.main,
        "&:hover": {
            transitionProperty: "transform",
            transitionDuration: "100ms",
            transform: "scale(1.2)",
            color: theme.palette.secondary.dark
        }
    }
})
export const RecentReplays = withStyles(styles)(RecentReplaysComponent)