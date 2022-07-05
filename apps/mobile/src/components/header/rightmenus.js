import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Menu from 'react-native-reanimated-material-menu';
import { notesnook } from '../../../e2e/test.ids';
import Navigation from '../../services/navigation';
import SearchService from '../../services/search';
import useNavigationStore from '../../stores/use-navigation-store';
import { useSettingStore } from '../../stores/use-setting-store';
import { useThemeStore } from '../../stores/use-theme-store';
import { SIZE } from '../../utils/size';
import { Button } from '../ui/button';
import { IconButton } from '../ui/icon-button';

export const RightMenus = () => {
  const colors = useThemeStore(state => state.colors);
  const deviceMode = useSettingStore(state => state.deviceMode);
  const rightButtons = useNavigationStore(state => state.headerRightButtons);
  const currentScreen = useNavigationStore(state => state.currentScreen.name);
  const menuRef = useRef();

  return (
    <View style={styles.rightBtnContainer}>
      {!currentScreen.startsWith('Settings') &&
      currentScreen !== 'Auth' &&
      currentScreen !== 'Signup' &&
      currentScreen !== 'Login' ? (
        <IconButton
          onPress={async () => {
            SearchService.prepareSearch();
            Navigation.navigate({
              name: 'Search'
            });
          }}
          testID="icon-search"
          name="magnify"
          color={colors.pri}
          customStyle={styles.rightBtn}
        />
      ) : null}

      {deviceMode !== 'mobile' ? (
        <Button
          onPress={RightMenus.floatingButtonAction}
          testID={notesnook.ids.default.addBtn}
          icon={currentScreen === 'Trash' ? 'delete' : 'plus'}
          iconSize={SIZE.xl}
          type="shade"
          hitSlop={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 0
          }}
          style={{
            marginLeft: 10,
            width: 32,
            height: 32,
            borderRadius: 5,
            paddingHorizontal: 0,
            borderWidth: 1,
            borderColor: colors.accent
          }}
        />
      ) : null}

      {rightButtons && rightButtons.length > 0 ? (
        <Menu
          ref={menuRef}
          animationDuration={200}
          style={{
            borderRadius: 5,
            backgroundColor: colors.bg
          }}
          button={
            <IconButton
              onPress={() => {
                menuRef.current?.show();
              }}
              name="dots-vertical"
              color={colors.pri}
              customStyle={styles.rightBtn}
            />
          }
        >
          {rightButtons.map((item, index) => (
            <Button
              style={{
                width: 150,
                justifyContent: 'flex-start',
                borderRadius: 0
              }}
              type="gray"
              buttonType={{
                text: colors.pri
              }}
              key={item.title}
              title={item.title}
              onPress={item.onPress}
            />
          ))}
        </Menu>
      ) : null}
    </View>
  );
};

RightMenus.floatingButtonAction = () => {};

const styles = StyleSheet.create({
  rightBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginLeft: 10,
    paddingRight: 0
  }
});
