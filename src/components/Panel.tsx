export type PanelProps = {
    children?: React.ReactNode
}

const Panel = (props: PanelProps) => {
    return <div
        className='bg-slate-800 text-white rounded-xl'
    >{props.children}</div>
}

const PanelHeader = (props: PanelProps) => {
    return <div
        className='p-4 text-4xl'
    >{props.children}</div>
}

const PanelBody = (props: PanelProps) => {
    return <div
        className='p-4 text-lg'
    >{props.children}</div>
}

const PanelFooter = (props: PanelProps) => {
    return <div
        className='p-4 text-sm'
    >{props.children}</div>
}

const PanelRule = () => {
    return <div className='border-t border-t-slate-500'></div>
}

export { Panel, PanelHeader, PanelBody, PanelFooter, PanelRule }