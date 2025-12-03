<template>
  <q-page class="q-pa-lg">
    <div class="q-mx-auto" style="max-width: 980px">
      <div class="text-h5 q-mb-sm">Contacto</div>
      <div class="text-body1 q-mb-lg">
        ¿Tienes alguna pregunta, sugerencia o necesitas ayuda con tu pedido? Escríbenos mediante el
        formulario y te responderemos lo antes posible. También puedes llamarnos o escribir por WhatsApp.
      </div>

      <q-card flat bordered>
        <q-card-section>
          <q-form @submit.prevent="onSubmit" @reset.prevent="onReset" ref="formRef">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input v-model="form.fullName" label="Nombre y apellidos" :rules="[req]" dense filled />
              </div>
              <div class="col-12 col-sm-6">
                <q-input v-model="form.email" type="email" label="Correo electrónico" :rules="[req, isEmail]" dense filled />
              </div>
              <div class="col-12 col-sm-6">
                <q-input v-model="form.phone" type="tel" label="Teléfono" dense filled />
              </div>
              <div class="col-12 col-sm-6">
                <q-input v-model="form.subject" label="Asunto" :rules="[req]" dense filled />
              </div>
              <div class="col-12">
                <q-input v-model="form.message" type="textarea" autogrow label="Mensaje" :rules="[reqMin]" dense filled />
              </div>
            </div>

            <div class="row justify-between items-center q-gmt-md">
              <div class="text-grey-8">
                <q-icon name="call" class="q-mr-xs" /> +53 5 000 0000
                <span class="q-mx-sm">•</span>
                <q-icon name="mail" class="q-mr-xs" /> soporte@mercadotexas.cu
              </div>
              <div class="row q-gutter-sm">

                <q-btn type="reset" flat color="primary" label="Limpiar" :disable="loading" />
                <q-btn type="submit" color="primary" unelevated :loading="loading" label="Enviar" icon="send" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const formRef = ref();
const loading = ref(false);

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

function req(v: string) { return !!v || 'Requerido'; }
function isEmail(v: string) {
  if (!v) return 'Requerido';
  const ok = /.+@.+\..+/.test(v);
  return ok || 'Correo inválido';
}
function reqMin(v: string) {
  if (!v) return 'Requerido';
  return v.trim().length >= 10 || 'Mínimo 10 caracteres';
}

async function onSubmit() {
  // validate form via q-form
  const valid = await formRef.value?.validate?.();
  if (!valid) return;
  try {
    loading.value = true;

    $q.notify({ type: 'positive', message: '¡Gracias! Tu mensaje ha sido enviado.' });
    onReset();
  } catch {
    $q.notify({ type: 'negative', message: 'No se pudo enviar. Intenta nuevamente.' });
  } finally {
    loading.value = false;
  }
}

function onReset() {
  form.fullName = '';
  form.email = '';
  form.phone = '';
  form.subject = '';
  form.message = '';
}
</script>

<style scoped>
/* Ensure two-column layout on >= sm is handled by Quasar grid classes */
</style>
