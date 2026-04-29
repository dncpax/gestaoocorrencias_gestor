export default {
	update_dados: async()=>{
		//corre as 2 queries
		await q_getorgs.run();
		await q_getusers.run();
	},
	orgs_insert: async()=>{
		//atualiza ou insere orgs
		//chamada pelo botão de gravar na forma de nova org
		const params = {
			designacao: form_org_new.data.inp_neworg_designacao,
	    tipo_org: form_org_new.data.sel_neworg_tipo
		};
		await q_insert_org.run(params);
		showAlert(JSON.stringify(q_insert_org.data), 'info');
		if(q_insert_org.responseMeta.isExecutionSuccess) {
			closeModal(modal_novaorg.name);
			this.update_dados();
		}
		else
			showAlert('ERRO AO INSERIR ORGANIZAÇÃO!','Error');
	},
	orgs_delete: async()=>{
		//chamada pela form de update de user
		const params = {
			org_id: tbl_Orgs.triggeredRow.org_id
		};
		await q_delete_org.run(params);
		showAlert(JSON.stringify(q_delete_org.data), 'info');
		if(q_delete_org.responseMeta.isExecutionSuccess) {
			closeModal(Modal_delete_org.name);
			this.update_dados();
		}
		else
			showAlert('ERRO AO APAGAR ORG!','Error');
	},
	users_create: async()=>{
		//chamada pela form de update de user
		const params = {
			entidade_id: JSONForm_createuser.formData.entidade_id,
			nome: JSONForm_createuser.formData.nome,
	    tipo_entidade: JSONForm_createuser.formData.tipo_entidade,
			email: JSONForm_createuser.formData.email,
			org_id: JSONForm_createuser.formData.org_id
		};
		await q_inserir_user.run(params);
		showAlert(JSON.stringify(q_inserir_user.data), 'info');
		if(q_inserir_user.responseMeta.isExecutionSuccess) {
			closeModal(modal_create_user.name);
			q_getusers.run();
		}
		else
			showAlert('ERRO AO CRIAR USER!','Error');
	},
	users_update: async()=>{
		//chamada pela form de update de user
		const params = {
			entidade_id: JSONForm1.formData.entidade_id,
			nome: JSONForm1.formData.nome,
	    tipo_entidade: JSONForm1.formData.tipo_entidade,
			email: JSONForm1.formData.email,
			org_id: JSONForm1.formData.org_id
		};
		await q_update_user.run(params);
		showAlert(JSON.stringify(q_update_user.data), 'info');
		if(q_update_user.responseMeta.isExecutionSuccess) {
			closeModal(modal_update_user.name);
			q_getusers.run();
		}
		else
			showAlert('ERRO AO ATUALIZAR USER!','Error');
	},
	users_delete: async()=>{
		//chamada pela form de update de user
		const params = {
			entidade_id: tbl_users.triggeredRow.entidade_id
		};
		await q_delete_user.run(params);
		showAlert(JSON.stringify(q_delete_user.data), 'info');
		if(q_delete_user.responseMeta.isExecutionSuccess) {
			closeModal(Modal_delete_user.name);
			q_getusers.run();
		}
		else
			showAlert('ERRO AO APAGAR USER!','Error');
	}
}