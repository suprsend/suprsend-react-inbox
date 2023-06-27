import styled from '@emotion/styled'

export const lightColors = {
  primary: '#066AF3',
  primaryText: '#1C1C1C',
  secondaryText: '#707070',
  border: '#DBDADA',
  main: '#FFF'
}

export const darkColors = {
  primary: '#3B8EFF',
  primaryText: '#EFEFEF',
  secondaryText: '#B8B8B8',
  border: '#434343',
  main: '#202020'
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
    markAllText: { color: darkColors.primary }
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
    }
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
      linkColor: darkColors.primary,
      blockquoteColor: darkColors.border
    },
    unseenDot: { backgroundColor: darkColors.primary },
    createdOnText: { color: darkColors.secondaryText },
    subtext: { color: darkColors.secondaryText },
    actions: [{ container: { backgroundColor: darkColors.primary } }]
  },
  toast: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    headerText: { color: darkColors.primaryText },
    bodyText: { color: darkColors.primaryText }
  },
  collapseToastNotification: {
    backgroundColor: darkColors.main,
    borderColor: darkColors.border,
    color: darkColors.primaryText
  }
}
