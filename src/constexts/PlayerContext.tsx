import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    isLooping: boolean,
    isShuffling: boolean,
    play: (episode: Episode) => void,
    tooglePlay: () => void,
    toggleLoop: () => void,
    toggleShufle: () => void,
    setPlayingState: (boolean) => void,
    playList: (list: Episode[], index: number) => void,
    playNext: () => void,
    playPrevious: () => void,
    hasNext: boolean,
    hasPrevious: boolean,
    clearPlayerState: () => void
}

type PlayerContextProviderProps = {
    children: ReactNode;
}
export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);


    function play(episode : Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function tooglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShufle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1)  < episodeList.length

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    function playNext() {

        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)    
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider 
            value={{
                episodeList, 
                currentEpisodeIndex, 
                play, 
                isPlaying, 
                isLooping,
                isShuffling,
                tooglePlay,
                toggleLoop,
                toggleShufle, 
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
                clearPlayerState
            }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayler = () => {
    return useContext(PlayerContext)
}