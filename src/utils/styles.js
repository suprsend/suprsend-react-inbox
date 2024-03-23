import styled from '@emotion/styled'

export const lightColors = {
  primary: '#2E70E8',
  primaryText: '#1E293B',
  secondaryText: '#475569',
  border: '#E2E8F0',
  main: '#FFFFFF',
  error: '#B42318'
}

export const darkColors = {
  primary: '#2E70E8',
  primaryText: '#EFEFEF',
  secondaryText: '#CBD5E1',
  border: '#3A4A61',
  main: '#1D2635',
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
    markAllReadText: { color: darkColors.primary }
  },
  tabs: {
    color: darkColors.primaryText,
    unselectedColor: darkColors.secondaryText + 'D9',
    bottomColor: darkColors.primary,
    badgeColor: 'rgba(100, 116, 139, 0.5)',
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
      readBackgroundColor: darkColors.main,
      unreadBackgroundColor: '#273244',
      hoverBackgroundColor: '#2D3A4D'
    },
    pinnedText: {
      color: darkColors?.secondaryText
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.secondaryText,
      blockquoteColor: 'rgba(100, 116, 139, 0.5)'
    },
    unseenDot: { backgroundColor: darkColors.primary },
    createdOnText: { color: darkColors.secondaryText },
    subtext: { color: darkColors.secondaryText },
    actions: [
      { container: { backgroundColor: darkColors.primary } },
      {
        container: {
          borderColor: darkColors.border,
          backgroundColor: 'transparent',
          hoverBackgroundColor: darkColors.main
        },
        text: { color: darkColors.secondaryText }
      }
    ],
    expiresText: {
      backgroundColor: 'rgba(100, 116, 139, 0.5)',
      color: darkColors.secondaryText,
      expiringBackgroundColor: 'rgba(217, 45, 32, 0.15)',
      expiringColor: darkColors.error
    },
    actionsMenuIcon: {
      color: darkColors.secondaryText,
      hoverBackgroundColor: 'rgba(100, 116, 139, 0.5)'
    },
    actionsMenu: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    actionsMenuItem: { hoverBackgroundColor: 'rgba(100, 116, 139, 0.2)' },
    actionsMenuItemIcon: { color: darkColors.secondaryText },
    actionsMenuItemText: {
      color: darkColors.secondaryText
    }
  },
  toast: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.secondaryText,
      blockquoteColor: darkColors.border
    }
  }
}
