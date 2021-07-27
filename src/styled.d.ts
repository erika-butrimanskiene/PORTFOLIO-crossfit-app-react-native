import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    appColors?: {
      backgroundColor?: string;
      backgroundColorDarken?: string;
      backgroundColorLighter?: string;
      primaryColorDarken?: string;
      primaryColorLighter?: string;
      accentColor?: string;
      textColorLightGray?: string;
      textColorDarkGray?: string;
      errorColor?: string;
      whiteColor?: string;
      blackColor?: string;
    };
  }
}
