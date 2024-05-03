'use client'

import { useState } from 'react'
import { StopIcon, StopSolidIcon } from './Icons'

export type TableColumns = {
    id: string,
    text: string,
    numeric?: boolean,
    render?: (node: React.ReactNode) => React.ReactNode
}

type Row = {
    [key: string]: React.ReactNode
}

const Table = ({columns, data}: {columns: TableColumns[], data?: Row[]}) => {

    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const onRowClick = (rowId: number) => {
        let updatedSelectedRows = selectedRows.slice()
        if(updatedSelectedRows.includes(rowId))
            updatedSelectedRows = updatedSelectedRows.filter(e => e !== rowId)
        else {
            updatedSelectedRows = [...updatedSelectedRows, rowId]
        }
        setSelectedRows(updatedSelectedRows)
    }

    return (
        <table className='table-auto w-full text-sm'>
            <thead>
                <tr className='border-b border-b-white'>
                    <td></td>
                    {columns.map((e) => {
                        return <th key={e.id} className={`text-${e.numeric ? 'end' : 'start'}`}>{e.text}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data && data.map((e, i) => {
                    return (
                        <tr key={i} onClick={() => onRowClick(i)} className={`border-b border-b-white ${selectedRows.includes(i) ? 'bg-green-600/25' : ''}`}>
                            <td>
                                {selectedRows.includes(i) ? 
                                    <StopSolidIcon className='text-green-500'></StopSolidIcon>
                                    :
                                    <StopIcon></StopIcon>
                                }
                            </td>
                            {columns.map((c) => {
                                return <td className={`text-${c.numeric ? 'end' : 'start'}`} key={c.id}>{e[c.id]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export { Table }