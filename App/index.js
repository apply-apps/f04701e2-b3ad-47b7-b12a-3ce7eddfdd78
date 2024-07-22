// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

const API_HUB_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';
const API_MODEL = 'gpt-4o';

const workouts = [
    { id: '1', name: 'Push Ups', duration: '30s', repetitions: '15 reps' },
    { id: '2', name: 'Squats', duration: '45s', repetitions: '20 reps' },
    { id: '3', name: 'Lunges', duration: '30s', repetitions: '10 reps per leg' },
    { id: '4', name: 'Plank', duration: '60s', repetitions: '' },
];

const WorkoutList = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.post(API_HUB_URL, {
                    messages: [
                        { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                        { role: "user", content: "Please provide a motivational message for a workout." }
                    ],
                    model: API_MODEL
                });
                const { data } = response;
                setMessage(data.response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching motivational message:", error);
                setLoading(false);
            }
        };
        fetchMessage();
    }, []);

    const renderWorkoutItem = ({ item }) => (
        <View style={styles.workoutItem}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.workoutDetails}>{item.duration} - {item.repetitions}</Text>
        </View>
    );

    return (
        <View>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                <Text style={styles.motivationMessage}>{message}</Text>
            }
            <FlatList
                data={workouts}
                renderItem={renderWorkoutItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        alignItems: 'center',
        paddingTop: 10,
    },
    workoutItem: {
        backgroundColor: '#EFEFEF',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: 300,
    },
    workoutName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    workoutDetails: {
        fontSize: 14,
        color: '#666',
    },
    motivationMessage: {
        fontSize: 16,
        fontStyle: 'italic',
        marginVertical: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    scrollViewContainer: {
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
});

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.title}>Workout Tracker</Text>
                <WorkoutList />
            </ScrollView>
        </SafeAreaView>
    );
}