import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import EmptyNotif from '../assets/svgs/emptyNotif.svg';

type dataType = {
  notif: string;
  date: string;
};

const data: dataType[] = [
  {
    notif:
      'moasdfasdfasdfasdfasfasdfadfasdfsdfsdfasdfasdfasdfasffasdfasdfasdfasfasdfngol',
    date: '2022/05/14',
  },
  {
    notif:
      'moasdfasdfasdfasdfasfasdfadfasdfsdfsdfasdfasdfasdfasffasdfasdfasdfasfasdfngol',
    date: '2022/05/10',
  },
];

export const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      {data === [] ? (
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => {
              return (
                <View style={styles.notifItemContainer}>
                  <Text>{item.notif}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.emptyContent}>
          <Text style={styles.emptyText}>
            Танд одоогоор мэдэгдэл ирээгүй байна.
          </Text>
          <EmptyNotif width={200} height={200} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContent: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '300',
  },
  notifItemContainer: {
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderRadius: 20,
    marginTop: 30,
  },
  dateText: {
    opacity: 0.5,
    marginTop: 7,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
});
