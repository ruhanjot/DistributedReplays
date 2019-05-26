import qs from "qs"
import { doGet, doPost } from "../apiHandler/apiHandler"
import { useMockData } from "./Config"
import { parseReplay } from "../Models"

export const getReplayCount = (): Promise<number> => {
    if (useMockData) {
        return Promise.resolve(1337)
    }
    return doGet("/global/replay_count")
}

export const getQueueStatuses = (): Promise<QueueStatus[]> => {
    return doGet("/global/queue/count")
}

export const getGlobalStats = (): Promise<GlobalStatsGraph[]> => doGet("/global/stats")
export const getGlobalRankGraphs = (): Promise<any> => doGet("/global/graphs")

// @return taskIds of uploaded replays
export const uploadReplays = (replays: File[]): Promise<string[]> => {
    const formData = new FormData()
    replays.forEach((file) => {
        formData.append("replays", file)
    })

    return doPost("/upload", formData)
}

export const getUploadStatuses = (ids: string[]): Promise<UploadStatus[]> => {
    return doGet("/upload" +
        qs.stringify({ids},
            {arrayFormat: "repeat", addQueryPrefix: true}
        ))
}

export const getLoggedInUser = (): Promise<LoggedInUser> => doGet("/me")

export const getRecentReplays = (): Promise<any> => doGet("/global/recent").then((replays) => (
    replays.map(parseReplay)
))
