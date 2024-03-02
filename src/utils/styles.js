import styled from '@emotion/styled'

export const lightColors = {
  primary: '#066AF3',
  primaryText: '#1C1C1C',
  secondaryText: '#707070',
  border: '#DBDADA',
  main: '#FFF',
  error: '#B42318'
}

export const darkColors = {
  primary: '#066AF3',
  primaryText: '#EFEFEF',
  secondaryText: '#B8B8B8',
  border: '#434343',
  main: '#202020',
  error: '#F97066'
}

export const CText = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  line-height: 20px;
  color: ${lightColors.primaryText};
  margin: 0px;
`

export const HelperText = styled(CText)`
  font-size: 12px;
  color: ${lightColors.secondaryText};
`

export const HeadingText = styled(CText)`
  font-size: 16px;
  font-weight: 500;
`

export const darkTheme = {
  bell: { color: '#fff' },
  badge: { backgroundColor: darkColors.primary },
  header: {
    container: {
      backgroundColor: darkColors.main,
      borderBottom: `0.5px solid ${darkColors.border}`,
      boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)'
    },
    headerText: { color: darkColors.primaryText },
    markAllReadText: { color: '#3B8EFF' }
  },
  tabs: {
    color: darkColors.primaryText,
    unselectedColor: darkColors.secondaryText,
    bottomColor: darkColors.primary,
    badgeColor: darkColors.primary,
    badgeText: darkColors.primaryText
  },
  notificationsContainer: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    noNotificationsText: {
      color: darkColors.primaryText
    },
    noNotificationsSubtext: {
      color: darkColors.secondaryText
    },
    loader: { color: darkColors.primary }
  },
  notification: {
    container: {
      borderBottom: `1px solid ${darkColors.border}`,
      unreadBackgroundColor: '#292929',
      unreadHoverBackgroundColor: '#3E3E3E',
      readBackgroundColor: darkColors.main,
      readHoverBackgroundColor: '#121212'
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.primaryText,
      blockquoteColor: darkColors.border
    },
    unseenDot: { backgroundColor: darkColors.primary },
    createdOnText: { color: darkColors.secondaryText },
    subtext: { color: darkColors.secondaryText },
    actions: [{ container: { backgroundColor: darkColors.primary } }],
    expiresText: {
      backgroundColor: 'rgba(100, 116, 139, 0.14)',
      color: darkColors.secondaryText,
      expiringBackgroundColor: 'rgba(217, 45, 32, 0.14)',
      expiringColor: darkColors.error
    }
  },
  toast: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.primaryText,
      blockquoteColor: darkColors.border
    }
  }
}
