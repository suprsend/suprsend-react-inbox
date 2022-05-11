import styled from '@emotion/styled'

export const ColorConfig = {
  primary: '#000000',
  secondary: '#358adf',
  tertiary: '',
  white: '#ffffff',
  lightGray1: '#707070',
  lightGray2: '#f0f0f0'
}

export const CText = styled.p`
  font-size: 14px;
  color: ${ColorConfig.primary};
  font-weight: 400;
  margin: 0px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

export const HeadingText = styled(CText)`
  font-size: 16px;
  font-weight: 500;
`

export const SubHeadingText = styled(CText)``

export const HelperText = styled(CText)`
  font-size: 12px;
  color: ${ColorConfig.lightGray1};
`
