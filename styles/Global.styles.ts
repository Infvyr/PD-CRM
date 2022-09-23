import { createGlobalStyle } from 'styled-components';
import { FormStyles } from './components/Form/Form.styles';
import { ImageStyles } from './components/Image/Image.styles';
import { DividerStyles } from './components/Divider/Divider.styles';
import { ImagePreviewStyles } from './components/ImagePreview/ImagePreview.styles';
import { KarmaDriverSelectStyles } from './components/KarmaDriverSelect/KarmaDriverSelect.styles';
import { AppMenuStyles } from './components/Menu/AppMenu.styles';
import { DropDownMenuStyles } from './components/Menu/DropDownMenu.styles';
import { TableStyles } from './components/Table/Table.styles';
import { LayoutStyles } from './components/Layout/Layout.styles';
import { NprogressStyles } from './components/Nprogress/Nprogress.styles';
import { CardStyles } from './components/Card/Card.styles';

export const GlobalStyles = createGlobalStyle`
  ${NprogressStyles}
  ${AppMenuStyles}
  ${DropDownMenuStyles}
  ${LayoutStyles}
  ${TableStyles}
  ${DividerStyles}
  ${FormStyles}
  ${ImageStyles}
  ${ImagePreviewStyles}
  ${CardStyles}
  ${KarmaDriverSelectStyles}

  @media (max-width: 600px){
    .ant-drawer-content-wrapper{
      width: 90vw !important;
    }
  }
`;
