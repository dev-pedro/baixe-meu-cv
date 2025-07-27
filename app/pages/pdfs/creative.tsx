// lib/pdf/templates/CreativeResume.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DataCreateCurriculoForm } from '@/app/types/types';

export const CreativeResume = ({ profile }: { profile: DataCreateCurriculoForm }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text>{profile?.profession}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        {profile?.showEmailInPDF && <Text>{profile?.email}</Text>}
        {profile?.showPhoneInPDF && <Text>{profile?.phone}</Text>}
        <Text>{profile?.city}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text>{profile?.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfólio</Text>
        {profile?.portfolio?.map((proj, idx) => (
          <View key={idx} style={styles.item}>
            <Text style={styles.projectTitle}>{proj.name}</Text>
            <Text>{proj.url}</Text>
            <Text>{proj.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Competências</Text>
        <Text>Skills: {profile?.skills?.join(', ')}</Text>
        <Text>Soft Skills: {profile?.softSkills?.join(', ')}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 12, fontFamily: 'Helvetica' },
  header: { textAlign: 'center', marginBottom: 30 },
  name: { fontSize: 24, fontWeight: 'bold' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  item: { marginBottom: 10 },
  projectTitle: { fontWeight: 'bold' },
});
