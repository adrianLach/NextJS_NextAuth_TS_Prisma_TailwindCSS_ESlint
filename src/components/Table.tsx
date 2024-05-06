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

    return (
        <table className='table-auto w-full text-sm'>
            <thead>
                <tr className='border-b border-b-white'>
                    {columns.map((e) => {
                        return <th key={e.id} className={`text-${e.numeric ? 'end' : 'start'}`}>{e.text}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data && data.map((e, i) => {
                    return (
                        <tr key={i} className={`border-b border-b-white ${''}`}>
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