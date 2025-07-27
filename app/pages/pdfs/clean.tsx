// lib/pdf/templates/CleanResume.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DataCreateCurriculoForm } from '@/app/types/types';

export const CleanResume = ({ profile }: { profile: DataCreateCurriculoForm }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.name}>{profile?.name}</Text>
      <Text>{profile?.profession}</Text>
      <Text>{profile?.city}</Text>
      {profile?.showEmailInPDF && <Text>{profile?.email}</Text>}
      {profile?.showPhoneInPDF && <Text>{profile?.phone}</Text>}

      <Text style={styles.section}>Bio</Text>
      <Text>{profile?.bio}</Text>

      <Text style={styles.section}>Experiências</Text>
      {profile?.experiences?.map((exp, idx) => (
        <View key={idx}>
          <Text>
            {exp.company} ({exp.start} - {exp.end})
          </Text>
          {exp.jobs?.map((job, jIdx) => (
            <View key={jIdx}>
              <Text>
                {job.function} ({job.start} - {job.end})
              </Text>
              <Text>{job.description}</Text>
            </View>
          ))}
        </View>
      ))}

      <Text style={styles.section}>Formação</Text>
      {profile?.graduation?.map((grad, idx) => (
        <View key={idx}>
          <Text>
            {grad.institution} - {grad.name} ({grad.year})
          </Text>
          <Text>{grad.description}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
  name: { fontSize: 22, marginBottom: 5 },
  section: { marginTop: 20, fontSize: 14, fontWeight: 'bold' },
});
