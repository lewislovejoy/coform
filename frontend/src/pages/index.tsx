import {Box, Theme, Container, Heading, Text } from '@radix-ui/themes';
import FileManager from "@/components/fileManager";

import Header from "@/components/header";

export default function Home() {
  return (
    <main>
      <Theme>
        <Header />
        <Box>
          <Container size="1">
              <Box pt="9" pb="5">
                <Heading>Upload your sources</Heading>
                <Text>Select your transcripts, notes and emails.</Text>
              </Box>
              <div>
                <FileManager />
              </div>
          </Container>
        </Box>

      </Theme>
    </main>
  );
}
