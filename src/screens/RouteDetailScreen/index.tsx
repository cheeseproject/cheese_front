import React, { useState } from 'react';
import { useRouteDetailScreen } from './useRouteDetailScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { ToggleButton } from 'react-native-paper';

export const RouteDetailScreen = () => {
    const { snapRoutes, isLoading } = useRouteDetailScreen();

    const TAB_MENE = {
        MAP: 'map',
        ROUTE: 'route',
    } as const;

    const [tabMenu, setTabMenu] = useState<string>(TAB_MENE.MAP);
    const handleChangeTabMenu = (menu: string) => {
        setTabMenu(menu);
    };

    const isActive = (menu: string) => {
        return tabMenu === menu;
    };

    return (
        <View>
            {/* <ToggleButton.Row
                onValueChange={handleChangeTabMenu}
                value={tabMenu}
            >
                <ToggleButton value={TAB_MENE.MAP}>
                    <Text>マップ</Text>
                </ToggleButton>
                <ToggleButton icon="format-align-right" value="right" />
            </ToggleButton.Row> */}
        </View>
    );
};
