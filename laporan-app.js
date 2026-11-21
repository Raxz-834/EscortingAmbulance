(function(){
  const sessionKey='vabeAdminSession',reportKey='vabeLaporan';
  if(sessionStorage.getItem(sessionKey)!=='1'){location.replace('admin.html');return}
  const field=id=>document.getElementById(id);
  const form=field('reportForm'),formPanel=document.querySelector('.form-panel'),resultPanel=document.querySelector('.preview-panel'),workspace=field('workspace'),history=document.querySelector('.history');
  const paper=field('reportPaper'),pageTitle=document.querySelector('.page-title h1'),pageLead=document.querySelector('.page-title p'),newBtn=field('newBtn');
  const read=()=>{try{return JSON.parse(localStorage.getItem(reportKey)||'[]')}catch{return[]}};
  const write=data=>localStorage.setItem(reportKey,JSON.stringify(data));
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const formatDate=value=>{if(!value)return '—';const [y,m,d]=value.split('-');return `${d}/${m}/${y}`};
  const selectedText=id=>field(id).selectedOptions[0]?.textContent||'';
  let currentId=null;

  history?.classList.add('hidden');
  resultPanel.classList.add('hidden');
  newBtn.classList.add('hidden');
  document.querySelector('.preview-actions').innerHTML='<button class="btn secondary" id="editBtn" type="button">Edit</button><button class="btn green" id="saveFileBtn" type="button">Simpan</button><button class="btn blue" id="printBtn" type="button">Cetak</button><button class="btn secondary" id="shareBtn" type="button">Bagikan</button>';
  document.body.insertAdjacentHTML('beforeend','<div class="modal hidden" id="saveModal"><div class="modal-card"><h2>Simpan laporan</h2><p>Pilih format dengan desain laporan lengkap.</p><div class="modal-options"><button class="btn green" id="pdfChoice" type="button">Simpan PDF</button><button class="btn blue" id="photoChoice" type="button">Simpan Foto</button></div><button class="btn secondary modal-close" data-close="saveModal" type="button">Batal</button></div></div><div class="modal hidden" id="shareModal"><div class="modal-card"><h2>Bagikan laporan</h2><p>File desain akan dilampirkan melalui menu bagikan pada HP. Pilih WhatsApp atau Gmail saat menu aplikasi terbuka.</p><div class="modal-options"><button class="btn green" id="whatsappChoice" type="button">WhatsApp</button><button class="btn blue" id="gmailChoice" type="button">Gmail</button></div><button class="btn secondary modal-close" data-close="shareModal" type="button">Batal</button></div></div>');

  function values(){
    const street=field('street').value.trim(),village=selectedText('village'),district=selectedText('district'),region=selectedText('region');
    const location=[street,village,district&&`Kec. ${district}`,region].filter(Boolean).join(', ');
    return{id:currentId||`LAP-${Date.now()}`,date:field('date').value,time:field('time').value,type:field('type').value,regionId:field('region').value,region,districtId:field('district').value,district,villageId:field('village').value,village,street,location,reporter:field('reporter').value.trim(),source:field('source').value,createdAt:new Date().toISOString()};
  }
  function updatePreview(){const r=values();field('outDate').textContent=formatDate(r.date);field('outTime').textContent=r.time?`${r.time} WIB`:'—';field('outType').textContent=r.type||'—';field('outLocation').textContent=r.location||'—';field('outReporter').textContent=r.reporter||'—';field('outSource').textContent=r.source||'—'}
  function setDefaults(){const now=new Date(),offset=now.getTimezoneOffset()*60000,local=new Date(now-offset);field('date').value=local.toISOString().slice(0,10);field('time').value=local.toTimeString().slice(0,5);updatePreview()}
  function showForm(editing=false){formPanel.classList.remove('hidden');resultPanel.classList.add('hidden');workspace.classList.remove('result-only');newBtn.classList.add('hidden');pageTitle.textContent=editing?'Edit laporan kejadian':'Form laporan kejadian';pageLead.textContent='Lengkapi data terlebih dahulu, kemudian simpan untuk melihat hasil laporan.';scrollTo({top:0,behavior:'smooth'})}
  function showResult(){updatePreview();formPanel.classList.add('hidden');resultPanel.classList.remove('hidden');workspace.classList.add('result-only');newBtn.classList.remove('hidden');pageTitle.textContent='Laporan kejadian';pageLead.textContent='Laporan telah tersimpan. Pilih simpan, cetak, bagikan, atau kembali mengedit.';scrollTo({top:0,behavior:'smooth'})}
  function openModal(id){field(id).classList.remove('hidden')}
  function closeModal(id){field(id).classList.add('hidden')}
  async function fillAreas(url,select,placeholder){select.disabled=true;select.innerHTML='<option value="">Memuat...</option>';try{const response=await fetch(url);if(!response.ok)throw new Error();const data=await response.json();select.innerHTML=`<option value="">${placeholder}</option>`+data.map(item=>`<option value="${esc(item.id)}">${esc(item.name.replace(/^(KABUPATEN|KOTA|KECAMATAN|KELURAHAN|DESA)\s+/i,''))}</option>`).join('');select.disabled=false;field('areaStatus').textContent='Wilayah berhasil dimuat.'}catch{select.innerHTML='<option value="">Gagal memuat pilihan</option>';field('areaStatus').textContent='Pilihan wilayah memerlukan koneksi internet. Coba muat ulang halaman.'}}
  async function loadRecord(record){
    currentId=record.id;['date','time','type','street','reporter','source'].forEach(key=>field(key).value=record[key]||'');
    if(record.regionId){field('region').value=record.regionId;await fillAreas(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${record.regionId}.json`,field('district'),'Pilih kecamatan');field('district').value=record.districtId||'';if(record.districtId){await fillAreas(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${record.districtId}.json`,field('village'),'Pilih desa/kelurahan');field('village').value=record.villageId||''}}else if(record.location){field('street').value=record.location}
    updatePreview();
  }
  async function renderCanvas(){updatePreview();paper.classList.add('pdf-export');await document.fonts.ready;try{return await html2canvas(paper,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false})}finally{paper.classList.remove('pdf-export')}}
  function filename(ext){return `Laporan-VABE-${field('date').value||'tanpa-tanggal'}.${ext}`}
  async function downloadPdf(){const canvas=await renderCanvas(),{jsPDF}=window.jspdf,pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4',compress:true});pdf.addImage(canvas.toDataURL('image/jpeg',.95),'JPEG',0,0,210,297,undefined,'FAST');pdf.save(filename('pdf'))}
  async function getPhotoBlob(){const canvas=await renderCanvas();return await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.95))}
  async function downloadPhoto(){const blob=await getPhotoBlob(),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename('jpg');a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)}
  function summary(){const r=values();return`Laporan Kejadian V.A.B.E\nTanggal: ${formatDate(r.date)}\nWaktu: ${r.time} WIB\nJenis: ${r.type}\nLokasi: ${r.location}\nPelapor: ${r.reporter}\nSumber: ${r.source}`}
  async function shareDesign(target){
    const blob=await getPhotoBlob(),file=new File([blob],filename('jpg'),{type:'image/jpeg'}),text=summary();
    if(navigator.share&&navigator.canShare?.({files:[file]})){try{await navigator.share({title:'Laporan Kejadian V.A.B.E',text,files:[file]});return}catch(error){if(error.name==='AbortError')return}}
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename('jpg');a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
    alert('File desain sudah diunduh. Lampirkan file tersebut pada pesan yang akan dibuka.');
    if(target==='wa')window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank');else window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent('Laporan Kejadian V.A.B.E')}&body=${encodeURIComponent(text)}`,'_blank');
  }

  ['date','time','type','region','district','village','street','reporter','source'].forEach(id=>field(id).addEventListener('input',updatePreview));
  field('region').addEventListener('change',async()=>{field('village').innerHTML='<option value="">Pilih desa/kelurahan</option>';field('village').disabled=true;if(!field('region').value)return;await fillAreas(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${field('region').value}.json`,field('district'),'Pilih kecamatan');updatePreview()});
  field('district').addEventListener('change',async()=>{if(!field('district').value)return;await fillAreas(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${field('district').value}.json`,field('village'),'Pilih desa/kelurahan');updatePreview()});
  form.addEventListener('reset',()=>setTimeout(()=>{currentId=null;setDefaults()}));
  form.addEventListener('submit',e=>{e.preventDefault();const record=values(),data=read(),index=data.findIndex(item=>item.id===record.id);if(index>=0)data[index]={...data[index],...record,updatedAt:new Date().toISOString()};else data.unshift(record);currentId=record.id;write(data);showResult()});
  field('editBtn').addEventListener('click',()=>showForm(true));
  field('saveFileBtn').addEventListener('click',()=>openModal('saveModal'));
  field('printBtn').addEventListener('click',()=>window.print());
  field('shareBtn').addEventListener('click',()=>openModal('shareModal'));
  field('pdfChoice').addEventListener('click',async()=>{closeModal('saveModal');await downloadPdf()});
  field('photoChoice').addEventListener('click',async()=>{closeModal('saveModal');await downloadPhoto()});
  field('whatsappChoice').addEventListener('click',async()=>{closeModal('shareModal');await shareDesign('wa')});
  field('gmailChoice').addEventListener('click',async()=>{closeModal('shareModal');await shareDesign('gmail')});
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>closeModal(button.dataset.close)));
  newBtn.addEventListener('click',()=>{currentId=null;form.reset();setDefaults();showForm(false);field('region').focus()});

  (async()=>{setDefaults();const params=new URLSearchParams(location.search),id=params.get('id'),mode=params.get('mode')||'view',record=read().find(item=>item.id===id);if(record){await loadRecord(record);if(mode==='edit')showForm(true);else{showResult();if(params.get('download')==='pdf')setTimeout(downloadPdf,400)}}else showForm(false)})();
})();
