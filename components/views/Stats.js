// @flow
import * as React from 'react';
import {
  AsyncStorage, Text, View, FlatList, StyleSheet,
} from 'react-native';
import Colors from '../../resources/Colors';
import Button from '../global/Button';
import Spinner from '../global/Spinner';

type StatsType = Array<{ user: string, points: number }>;

type State = {
  stats: StatsType,
  loading: boolean
}

type Props = {
  navigation: {
    goBack: Function,
  },
};

export default class Stats extends React.Component<Props, State> {
  state = {
    stats: [],
    loading: true,
  }

  async componentDidMount() : Promise<void> {
    const pureStats: StatsType = JSON.parse(await AsyncStorage.getItem('stats'));
    const stats: StatsType = pureStats.sort((a, b) => a.points + b.points).filter(val => val.points > 0);

    this.setState({
      stats,
      loading: false,
    });
  }

  render(): React.Node {
    const { stats, loading } = this.state;
    const { navigation } = this.props;

    if (!loading && stats.length === 0) {
      return (
        <View style={styles.specialWrapper}>
          <Text style={{ fontSize: 26, color: Colors.red }}>Nothing to show.</Text>
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Button
            buttonStyle={styles.backButton}
            icon="md-arrow-back"
            iconColor={Colors.gray}
            action={() => navigation.goBack()}
          />
          <Text style={styles.title}>Stats</Text>
        </View>
        {loading ? <Spinner /> : (
          <View style={{ marginTop: 10 }}>
            <View style={styles.list}>
              <Text style={styles.userText}>Name</Text>
              <Text style={styles.pointText}>Points</Text>
            </View>
            <FlatList
              data={stats}
              renderItem={({ item }) => (
                <View style={[styles.list, { paddingBottom: 5 }]}>
                  <Text style={[styles.userText, { fontWeight: '400', color: Colors.gray }]}>{item.user}</Text>
                  <Text style={[styles.pointText, { fontWeight: '400' }]}>{item.points}</Text>
                </View>
              )}
              keyExtractor={(val, ind) => String(ind)}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles: StyleSheet.styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  specialWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    marginVertical: 5,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontFamily: 'BreeSerif',
    fontSize: 26,
    color: Colors.gray,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  userText: {
    color: Colors.yellow,
    fontSize: 22,
    fontWeight: 'bold',
  },
  pointText: {
    color: Colors.red,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
