import FetchServerData from "@/utils/FetchServerData"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RevealOnScroll from "@/components/animation/RevealOnScroll"
import AnimatedPage from "@/components/animation/AnimatedPage"

interface Player {
  key: number;
  username: string;
  timeOfCompletion: string;
}

function LeaderBoard() {
  const [playersList , setPlayersList] =  useState<Player[]>([]);


  useEffect(() => {
    (async() => {
      const res = await FetchServerData("/leaderBoard");
      const resArray = Array.isArray(res) ? res : [res];
      setPlayersList(resArray);
    })()
  }, [])

  return (
    <AnimatedPage>
      <div className="h-screen">
    
    <RevealOnScroll><p className="text-white font-BebasNeue mt-12 text-8xl">LeaderBoard</p></RevealOnScroll>
    
    
    <Table className="mt-12">
      <TableCaption>Rank of all Players.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Username</TableHead>
          <TableHead className="text-right">Time taken</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {
        playersList ?   

        playersList.map((player: { key :number; username: string; timeOfCompletion: string }) => (
          <TableRow className="text-white" key={player.key}>
            <TableCell>{player.key}</TableCell>
            <TableCell>{player.username}</TableCell>
            <TableCell className="text-right">{player.timeOfCompletion}s</TableCell>
          </TableRow>
        ))
        
        :
        
        <p>Loading...</p>
      }
      </TableBody>
    </Table>
    </div>
    </AnimatedPage>
    
  )
}

export default LeaderBoard