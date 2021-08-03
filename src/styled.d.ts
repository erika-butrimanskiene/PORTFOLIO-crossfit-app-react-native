import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    appColors?: {
      backgroundColor?: string;
      backgroundColor_opacity50?: string;
      backgroundColor_opacity20?: string;
      backgroundColorDarken?: string;
      backgroundColorLighter?: string;
      backgroundColorVeryLight?: string;
      primaryColorDarken?: string;
      primaryColorLighter?: string;
      accentColor?: string;
      accentColor_opacity50?: string;
      textColorLightGray?: string;
      textColorDarkGray?: string;
      errorColor?: string;
      whiteColor?: string;
      blackColor?: string;
    };
  }
}
