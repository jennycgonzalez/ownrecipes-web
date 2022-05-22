import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import { Recipe } from '../../recipe/store/RecipeTypes';
import FileSelect from '../../common/components/FileSelect';
import { getRecipeImage } from '../../common/utility';
import WidthHeightRatio from '../../common/components/WidthHeightRatio';
import Image from '../../common/components/Image';
import { IMAGE_PLACEHOLDER } from '../../common/constants';

export interface IRecipeFormImageRowProps {
  form:     Recipe | undefined;
  update:   (name: string, value: unknown) => void;
}

const RecipeFormImageRow: React.FC<IRecipeFormImageRowProps> = ({
    form, update }: IRecipeFormImageRowProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    photo_label: {
      id: 'recipe.create.photo_label',
      description: 'Photo label',
      defaultMessage: 'Photo',
    },
  });

  const { key } = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const photoInputRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (photoInputRef.current) {
      photoInputRef.current.clearValue();
    }
    setImageUrl(undefined);
  }, [key]);

  const handleImageChange = (name: string, newValue: File | undefined) => {
    setImageUrl(newValue ? URL.createObjectURL(newValue) : '');
    update(name, newValue);
  };

  const getDisplayImage = () => {
    if (imageUrl != null) {
      return imageUrl.length > 0 ? imageUrl : IMAGE_PLACEHOLDER;
    } else {
      return getRecipeImage(form?.photoThumbnail ?? IMAGE_PLACEHOLDER);
    }
  };

  return (
    <>
      <Row>
        <Col xs={12} lg={11} xl={10} xxl={9} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <WidthHeightRatio height={66.67} width={100}>
            <Image
                src   = {getDisplayImage()}
                alt   = ''
                style = {{ objectFit: 'contain' }} />
          </WidthHeightRatio>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <FileSelect
              name     = 'photo'
              label    = {formatMessage(messages.photo_label)}
              accept   = 'image/*'
              value    = {form?.photo}
              onChange = {handleImageChange}
              ref = {photoInputRef} />
        </Col>
      </Row>
    </>
  );
};

export default RecipeFormImageRow;
