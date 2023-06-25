import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    isBtnVisible: false,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.getData();
    }
  }

  getValue = inputValue => {
    this.setState({ value: inputValue, page: 1, images: [] });
  };

  getData = async () => {
    const { value, page, isBtnVisible } = this.state;
    try {
      const {
        photos,
        page: currentPage,
        per_page,
        total_results,
      } = await ImageService.getImages(value, page);
      console.log(total_results);
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isBtnVisible: currentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      return console.log(error.message);
    }
  };

  handleClick = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    const { images, isBtnVisible } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.getValue} />
        {images.length === 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        <Grid>
          {images.length > 0 &&
            images.map(({ src, alt, id, avg_color }) => {
              return (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img src={src.large} alt={alt} />
                  </CardItem>
                </GridItem>
              );
            })}
        </Grid>
        {isBtnVisible && <Button onClick={this.handleClick}>Load more</Button>}
      </>
    );
  }
}
