import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import {Avatar, Image, Text, Icon} from 'src/components';
import Container from '../Container';
import Rating from '../Rating';

import {API} from 'src/config/api';
import {VENDOR} from 'src/config/development';
import {green, white, black} from 'src/components/config/colors';
import {borderRadius, margin, padding} from 'src/components/config/spacing';

const {width: WIDTH} = Dimensions.get('window');

const widthBg = WIDTH - 2 * padding.large;
const heightBg = (widthBg * 120) / 345;

function VendorWcfm(props) {
  const {t} = useTranslation();
  const {store, width, height, style, onPress} = props;
  const {store_name, store_slug, gravatar, banner_url, avg_review_rating, total_review_count} = store;
  const Component = onPress ? TouchableOpacity : View;
  const componentProps = onPress
    ? {
      onPress,
    }
    : {};
  const handleShare = () => {
    const url = `${API}/store/${store_slug}`;
    Share.share({
      message: 'Share store',
      title: `Store "${store_name}".${url}`,
      url: url,
    });
  };

  return (
    <Component style={style} {...componentProps}>
      <Image
        source={
          banner_url
            ? {uri: banner_url}
            : require('src/assets/images/pDefault.png')
        }
        style={{
          width,
          height,
        }}
        containerStyle={styles.containerImageBg}
      />
      <Container style={styles.contentStore}>
        <View style={styles.opacityView} />
        <Avatar
          rounded
          size={60}
          source={
            gravatar
              ? {uri: gravatar}
              : require('src/assets/images/pDefault.png')
          }
        />
        <View style={styles.viewNameStore}>
          {store.featured && (
            <Text h6 style={styles.textFeatured}>
              {t('catalog:text_store_featured')}
            </Text>
          )}
          <Text style={styles.name} medium h3>
            {store_name}
          </Text>
          <View style={styles.viewFooter}>
            <View style={styles.viewRating}>
              <Rating readonly startingValue={avg_review_rating} />
              <Text style={styles.count} h6 medium>
                ({total_review_count})
              </Text>
            </View>
            {onPress ? (
              <Text style={styles.visitStore} h6>
                {t('catalog:text_store_visit')}
              </Text>
            ) : (
              <Icon
                name="share"
                color={white}
                size={19}
                iconStyle={styles.iconShare}
                underlayColor="transparent"
                onPress={handleShare}
              />
            )}
          </View>
        </View>
      </Container>
    </Component>
  )
}

function VendorDokan(props) {
  const {t} = useTranslation();
  const {store, width, height, style, onPress} = props;
  const {store_name, shop_url, gravatar, banner, rating} = store;
  const Component = onPress ? TouchableOpacity : View;
  const componentProps = onPress
    ? {
      onPress,
    }
    : {};
  const valueRating = rating?.rating ?? '0.0';

  const ratingNumber = parseFloat(valueRating) ? parseFloat(valueRating) : 0;

  const handleShare = () => {
    Share.share({
      message: 'Share store',
      title: `Store "${store_name}".${shop_url}`,
      url: shop_url,
    });
  };
  return (
    <Component style={style} {...componentProps}>
      <Image
        source={
          banner
            ? {uri: banner}
            : require('src/assets/images/pDefault.png')
        }
        style={{
          width,
          height,
        }}
        containerStyle={styles.containerImageBg}
      />
      <Container style={styles.contentStore}>
        <View style={styles.opacityView} />
        <Avatar
          rounded
          size={60}
          source={
            gravatar
              ? {uri: gravatar}
              : require('src/assets/images/pDefault.png')
          }
        />
        <View style={styles.viewNameStore}>
          {store.featured && (
            <Text h6 style={styles.textFeatured}>
              {t('catalog:text_store_featured')}
            </Text>
          )}
          <Text style={styles.name} medium h3>
            {store.store_name}
          </Text>
          <View style={styles.viewFooter}>
            <View style={styles.viewRating}>
              <Rating readonly startingValue={ratingNumber} />
              <Text style={styles.count} h6 medium>
                ({rating?.count ?? 0})
              </Text>
            </View>
            {onPress ? (
              <Text style={styles.visitStore} h6>
                {t('catalog:text_store_visit')}
              </Text>
            ) : (
              <Icon
                name="share"
                color={white}
                size={19}
                iconStyle={styles.iconShare}
                underlayColor="transparent"
                onPress={handleShare}
              />
            )}
          </View>
        </View>
      </Container>
    </Component>
  );
}

const styles = StyleSheet.create({
  containerImageBg: {
    borderRadius: borderRadius.large,
    overflow: 'hidden',
  },
  contentStore: {
    height: heightBg,
    marginTop: -heightBg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  opacityView: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: black,
    opacity: 0.5,
    borderRadius: borderRadius.large,
  },
  viewNameStore: {
    flex: 1,
    marginLeft: margin.large,
  },
  textFeatured: {
    color: green,
    marginBottom: 4,
  },
  name: {
    color: white,
    marginBottom: 2,
  },
  viewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewRating: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    color: white,
    marginLeft: margin.small + 1,
  },
  visitStore: {
    color: white,
    marginLeft: margin.small,
  },
  iconShare: {
    marginHorizontal: margin.small - 3,
  },
});

VendorHeaderDetail.defaultProps = {
  width: widthBg,
  height: heightBg,
};
export default function VendorHeaderDetail(props) {
  if (!props?.store) {
    return null;
  }
  const ComponentVendor = VENDOR === 'wcfm' ? VendorWcfm: VendorDokan;
  return <ComponentVendor {...props} />;
};
