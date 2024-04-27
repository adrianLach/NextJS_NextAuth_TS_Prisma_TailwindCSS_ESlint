type BadgeStatus = 'success' | 'warning' | 'error' | 'none' | string

export type BadgeProps = {
    text: string,
    status?: BadgeStatus
}

const Badge = (props: BadgeProps) => {

    const convertStatusToClassName = (e?: BadgeStatus) => {
        switch (e) {
            case 'success':
                return 'bg-green-300 px-2 rounded-lg text-green-800 font-bold uppercase select-none'
            case 'warning':
                return 'bg-orange-300 px-2 rounded-lg text-orange-800 font-bold uppercase select-none'
            case 'error':
                return 'bg-red-300 px-2 rounded-lg text-red-800 font-bold uppercase select-none'
            default:
                return 'bg-gray-300 px-2 rounded-lg text-gray-800 font-bold uppercase select-none'
        }
    }

    return (
        <span className={convertStatusToClassName(props.status)}>
            {props.text}
        </span>
    )
}

export default Badge