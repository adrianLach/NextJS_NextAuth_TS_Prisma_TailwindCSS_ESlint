import { Panel, PanelBody, PanelFooter, PanelHeader, PanelRule } from '@/components/Panel'

export default function Components() {

    return (
        <main className='h-full flex items-center justify-center px-32'>
            <Panel>
                <PanelHeader>
                    <p>Heading</p>
                </PanelHeader>
                <PanelRule></PanelRule>
                <PanelBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </PanelBody>
                <PanelRule></PanelRule>
                <PanelBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </PanelBody>
                <PanelRule></PanelRule>
                <PanelFooter>
                    <p>Footer</p>
                </PanelFooter>
            </Panel>
        </main>
    )
}